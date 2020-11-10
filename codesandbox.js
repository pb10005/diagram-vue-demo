import rateLimit from "reqlim";

export default function codeSandbox() {
  this.options.serverMiddleware.push(
    rateLimit({
      windowMs: 3000,
      max: 3
    })
  );
}
