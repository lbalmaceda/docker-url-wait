
# Docker "URL Wait"

Small NodeJS script to wait a given amount of seconds for an URL to respond successfully.

It's available on Docker Hub: https://hub.docker.com/r/lbalmaceda/url-wait


## How to call it

The script requires an `URL` value followed by an optional `timeout` in seconds.

```sh
# Try for 30 seconds
▶ docker run lbalmaceda/url-wait https://google.com

#  Or wait for more seconds
▶ docker run lbalmaceda/url-wait https://google.com 60
```

If the script timeouts, the process exists with a error code `1`.

## Why another wait-for image?
I've tried https://github.com/waisbrot/docker-wait but found that some web apps URLs returned instantly a successul code while the app was still initializating, thus not ready or accessible via a browser. 


### Details
This image invokes in a _while_ loop a `request` to the URL and ignores error responses. Using `HEAD` method instead of `GET` for some apps resulted in the same issue that made me create this image.

The image is sourced from `node:8-alpine` and weights only 72mb.

## License
MIT