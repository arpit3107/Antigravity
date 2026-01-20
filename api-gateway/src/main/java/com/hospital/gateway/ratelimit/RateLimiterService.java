package com.hospital.gateway.ratelimit;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;

@Service
public class RateLimiterService {

    private final StringRedisTemplate redisTemplate;
    private final DefaultRedisScript<Boolean> redisScript;

    public RateLimiterService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.redisScript = new DefaultRedisScript<>();
        this.redisScript.setScriptText(
                "local tokens_key = KEYS[1] " +
                        "local timestamp_key = KEYS[2] " +
                        "local rate = tonumber(ARGV[1]) " +
                        "local capacity = tonumber(ARGV[2]) " +
                        "local now = tonumber(ARGV[3]) " +
                        "local requested = tonumber(ARGV[4]) " +
                        "local last_tokens = tonumber(redis.call('get', tokens_key)) " +
                        "if last_tokens == nil then " +
                        "  last_tokens = capacity " +
                        "end " +
                        "local last_refreshed = tonumber(redis.call('get', timestamp_key)) " +
                        "if last_refreshed == nil then " +
                        "  last_refreshed = 0 " +
                        "end " +
                        "local delta = math.max(0, now - last_refreshed) " +
                        "local filled_tokens = math.min(capacity, last_tokens + (delta * rate)) " +
                        "local allowed = filled_tokens >= requested " +
                        "local new_tokens = filled_tokens " +
                        "if allowed then " +
                        "  new_tokens = filled_tokens - requested " +
                        "end " +
                        "redis.call('setex', tokens_key, 60, new_tokens) " +
                        "redis.call('setex', timestamp_key, 60, now) " +
                        "return allowed");
        this.redisScript.setResultType(Boolean.class);
    }

    public boolean isAllowed(String key, int replacements, int capacity, int tokens) {
        // Rate: replacements per second
        List<String> keys = Arrays.asList("request_rate_limiter.{" + key + "}.tokens",
                "request_rate_limiter.{" + key + "}.timestamp");
        String now = String.valueOf(Instant.now().getEpochSecond());
        return Boolean.TRUE.equals(redisTemplate.execute(redisScript, keys, String.valueOf(replacements),
                String.valueOf(capacity), now, String.valueOf(tokens)));
    }
}
