export function fromGPSDegToDecimalDeg(deg: number, min: number, sec: number) {
  return deg + min / 60 + sec / 3600
}
