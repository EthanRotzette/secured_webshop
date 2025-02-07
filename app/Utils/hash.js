const bcrypt = require("bcrypt")

    async function strHash(a, b) {
    b = b || 'SHA-256';
    var c = new TextEncoder().encode(a),
        d = await bcrypt.subtle.digest(b, c),
        e = Array.from(new Uint8Array(d)),
        f = e.map(function(c) {
          return c.toString(16).padStart(2, '0');
        }).join('');
    return f;
  }

module.exports = strHash;