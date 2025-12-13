import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // Use IP address as unique key
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    const { success, limit, remaining, reset } =
      await ratelimit.limit(`rate_limit_${ip}`);

    // Optional: debugging headers
    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", reset);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests. Please try again later."
      });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    next(error);
  }
};

export default rateLimiter;
