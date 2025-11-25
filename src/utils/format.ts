export function decode(encoded: string): string {
  const decoded = atob(encoded);
  const percentEncoded = Array.prototype.map
    .call(
      decoded,
      (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    )
    .join('');
  return decodeURIComponent(percentEncoded);
}

export function encode(decoded: string): string {
  return window.btoa(
    encodeURIComponent(String(decoded)).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );
}
