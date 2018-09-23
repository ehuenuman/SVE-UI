const PROXY_CONFIG = [
  {
    context: [
      "/auth",
      "/api"
    ],
    "target": "http://localhost:80",
    "secure": false
  }
]

module.exports = PROXY_CONFIG;