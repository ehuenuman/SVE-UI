const PROXY_CONFIG = [
  {
    context: [
      "/api",
      "/static"    
    ],
    "target": "http://localhost:80",
    "secure": false
  }
]

module.exports = PROXY_CONFIG;