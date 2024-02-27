"""principal routes lie here."""

import json
import logging
import signal
import sys
from threading import Thread
from time import sleep
from flask_cors import CORS

import ntcore
import waitress
from flask import Flask, render_template, send_from_directory
from flask_socketio import SocketIO, emit
from ntcore import util
import os


def signal_handler(_signal: int, _frame) -> None:
    """End on ctrl c."""
    sys.exit(0)


signal.signal(signal.SIGINT, signal_handler)


# initialize flask app and socketio
app = Flask(__name__, static_folder="dist", static_url_path="/")
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

inst = ntcore.NetworkTableInstance.getDefault()
table = inst.getTable("SmartDashboard")
inst.startClient4("client")
inst.setServerTeam(team=1280)
inst.startDSClient()
data = {}

log = logging.getLogger("werkzeug")
log.setLevel(logging.ERROR)

ntcore_log = logging.getLogger("ntcore")
ntcore_log.disabled = True

REFRESH_RATE = 1  # measured in Hz
SEND_TELEMETRY = False


def sub_num(name: str) -> None:
    """Subscribe to a double topic."""
    sub = table.getDoubleTopic(name).subscribe(-999)
    data[name] = sub


def sub_str(name: str) -> None:
    """Subscribe to a string topic."""
    sub = table.getStringTopic(name).subscribe("-999")
    data[name] = sub


def sub_bool(name: str) -> None:
    """Subscribe to a boolean topic."""
    sub = table.getBooleanTopic(name).subscribe(defaultValue=False)
    data[name] = sub


def serialize(obj: dict) -> str:
    """Serialize telemetry data to static JSON."""
    static = {}
    for key, sub in obj.items():
        static[key] = sub.get()

    return json.dumps(static)


@app.route("/set/<key>/<selection>")
def choose(key: str, selection: str) -> str:
    """Change sendable chooser."""
    chooser_control = util.ChooserControl(key, inst=inst)
    chooser_control.setSelected(selection)
    return "Sent"


# Route for serving dynamic content (all files within dist/)
@app.route("/static/<path:filename>")
def custom_static(filename):
    return send_from_directory("static", filename)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


def start(**server_kwargs: dict) -> None:
    """Start the app."""
    global app
    app = server_kwargs.pop("app", None)
    server_kwargs.pop("debug", None)

    waitress.serve(app, **server_kwargs)


def stop_telemetry() -> None:
    """Stop sending telemetry."""
    global SEND_TELEMETRY
    SEND_TELEMETRY = False


@socketio.on("connect")
def connect() -> None:
    """Handle client connection."""


@socketio.on("ping")
def ping() -> None:
    emit("pong")
    print("pinged!")


@socketio.on("request_data")
def request(obj: dict) -> None:
    """Handle client telemetry request.

    Expects JSON object with `refresh_rate` value in Hz.
    """
    global REFRESH_RATE, SEND_TELEMETRY
    try:
        REFRESH_RATE = obj["refresh_rate"]
    except KeyError:
        REFRESH_RATE = 1
    SEND_TELEMETRY = True


@socketio.on("stop_data")
def stopped() -> None:
    """Stop sending telemetry."""
    stop_telemetry()


@socketio.on("disconnect")
def disconnect() -> None:
    """Handle client disconnection."""
    stop_telemetry()


@socketio.on("subscribe")
def subscribe(obj: dict) -> None:
    """Handle client subscription request.

    Expects JSON object with list of topics,
    keys pertaining to data type,
    values pertaining to array of topic names.
    """
    for item in obj["doubles"]:
        sub_num(item)
    for item in obj["strings"]:
        sub_str(item)
    for item in obj["booleans"]:
        sub_bool(item)
    emit("subscribed")


def telemetry() -> None:
    """Periodically sends updated telemetry to client asynchronously.

    This function is meant to run in a separate thread,
    DO NOT DIRECTLY CALL IT FROM THE MAIN THREAD.
    """
    while True:
        if SEND_TELEMETRY:
            # using `socketio.emit` instead of `emit` due to async thread
            socketio.emit("telemetry_data", serialize(data))

        sleep(1 / REFRESH_RATE)


# start the periodic thread that handles telemetry requests
thread = Thread(target=telemetry)
thread.daemon = True
thread.start()


if __name__ == "__main__":
    # run app with socketio
    socketio.run(app, "localhost", 1280)
