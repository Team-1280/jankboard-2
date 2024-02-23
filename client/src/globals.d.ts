type Gear = 'park' | 'reverse' | 'neutral' | 'low' | 'auto' | 'drive'

type Mode = 'chill' | 'ludicrous' | 'cruise'

type App = 'camera' | 'media-player'

interface SongData {
  title: string
  artist: string
  src: string
  coverImg: string
}

interface AppData {
  [key: App]: {
    name: string
    component: SvelteComponent
    icon: string
  }
}

type Polar = {
  R: number
  theta: number
}

/*
 * Represents a network table with various vehicle parameters.
 *
 * @property orientation - The orientation of the vehicle.
 * @property chassis-x-speed - The speed of the vehicle along the x-axis.
 * @property chassis-y-speed - The speed of the vehicle along the y-axis.
 * @property accx - The acceleration of the vehicle along the x-axis.
 * @property accy - The acceleration of the vehicle along the y-axis.
 * @property accz - The acceleration of the vehicle along the z-axis.
 * @property jerk-x - The jerk of the vehicle along the x-axis.
 * @property jerk-y - The jerk of the vehicle along the y-axis.
 * @property voltage - The voltage of the vehicle's battery.
 * @property acc-profile - The acceleration profile of the vehicle.
 * @property gear - The current gear of the vehicle.
 */
interface TelemetryData {
  'orientation': number
  'chassis-x-speed': number
  'chassis-y-speed': number
  'accx': number
  'accy': number
  'accz': number
  'jerk-x': number
  'jerk-y': number
  'voltage': number
  'acc-profile': Mode | '-999'
  'gear': Gear | '-999'
  'ebrake': boolean
  'reorient': boolean
  'gpws': boolean
}

type CardinalDirection =
  | 'North'
  | 'Northeast'
  | 'East'
  | 'Southeast'
  | 'South'
  | 'Southwest'
  | 'West'
  | 'Northwest'

interface TelemetryTopics {
  doubles: string[]
  strings: string[]
  booleans: string[]
}
