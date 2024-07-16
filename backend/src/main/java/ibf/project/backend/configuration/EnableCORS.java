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
                registry
                        .addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("PUT", "GET", "HEAD", "POST", "DELETE",
                                "OPTIONS", "PATCH");
            }
        };

        // return new WebMvcConfigurer() {
        // @Override
        // public void addCorsMappings(CorsRegistry registry) {
        // registry
        // .addMapping("/**")
        // .allowedOriginPatterns("http://localhost:*") // Adjust to your allowed
        // origins pattern
        // .allowedMethods("PUT", "GET", "HEAD", "POST", "DELETE", "OPTIONS", "PATCH")
        // .allowedHeaders("*");

        // }
        // };
    }
}
