package ibf.project.backend.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class EnableCORS {

    @Bean
    public WebMvcConfigurer corsConfigurator() {

        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*").allowedMethods("PUT", "GET", "HEAD", "POST", "DELETE",
                        "OPTIONS", "PATCH");

            }

        };
    }
}

// public class EnableCORS implements WebMvcConfigurer {

// final String path;
// final String origins;

// public EnableCORS(String path, String origins) {
// this.path = path;
// this.origins = origins;
// }

// @Override
// public void addCorsMappings(CorsRegistry registry) {
// registry.addMapping(path).allowedOrigins(origins);
// }

// }