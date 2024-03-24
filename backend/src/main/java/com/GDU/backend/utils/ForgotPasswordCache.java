package com.GDU.backend.utils;

import com.GDU.backend.dtos.requests.ForgotPasswordRequest;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Component
public class ForgotPasswordCache {
        private Map<String, ForgotPasswordRequest> cache = new ConcurrentHashMap<>();
        private static final int EXPIRATION_MINUTES = 1;

        public void put(String email, ForgotPasswordRequest forgotPasswordRequest) {
            cache.put(email, forgotPasswordRequest);
            scheduleCacheEviction(email);
        }

        public ForgotPasswordRequest get(String email) {
            return cache.get(email);
        }

        public void remove(String email) {
            cache.remove(email);
        }

        private void scheduleCacheEviction(String email) {
            ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
            executorService.schedule(() -> remove(email), EXPIRATION_MINUTES, TimeUnit.MINUTES);
        }
}
