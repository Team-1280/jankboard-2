/**
 * Retrieves the voice audio path for the given audio file.
 *
 * @param audio - the id of the voice audio file requested (see the readout)
 * @param lang - the language of the audio
 * @return the path of the audio file
 */
type SupportedLanguage = 'en' | 'rus'
export default function getVoicePath(audio: string, lang: SupportedLanguage) {
  return `/static/voices/${lang}/${audio}.wav`
}
