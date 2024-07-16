package ibf.project.backend.services;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Value("${spring.mail.host}")
    private String smtpHost;

    @Value("${spring.mail.username}")
    private String gmail;

    @Value("${spring.mail.password}")
    private String gmailPassword;

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    public void sendMemberAddedEmail(String recipientEmail, String householdName) {

        if (emailSender instanceof JavaMailSenderImpl) {
            JavaMailSenderImpl mailSenderImpl = (JavaMailSenderImpl) emailSender;
            mailSenderImpl.setHost(smtpHost);
            mailSenderImpl.setPassword(gmailPassword);
            mailSenderImpl.setUsername(gmail);
            logger.info(">>>>>> Attempting to connect to SMTP host: {}", mailSenderImpl.getHost());
        } else {
            logger.warn(
                    ">>>>>>>> Unable to determine SMTP host - JavaMailSender is not an instance of JavaMailSenderImpl");
        }

        // SimpleMailMessage message = new SimpleMailMessage();

        // message.setFrom(senderEmail);
        // message.setTo(recipientEmail);
        // message.setSubject("[Kitchen Kakis] You have been added to a household");

        // String text = "Hello,\n\nYou have been added to the household " +
        // householdName
        // + "! \nYou may now log in to manage the household together!"
        // + ".\n\nBest regards,\nKitchen Kakis Team";
        // message.setText(text);

        // System.out.println("Email to be sent: " + message);

        // // Send email
        // emailSender.send(message);

        Map<String, Object> model = new HashMap<>();
        model.put("householdName", householdName);

        Context context = new Context();
        context.setVariables(model);

        String htmlContent = templateEngine.process("member-add-template.html", context);

        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(senderEmail);
            helper.setTo(recipientEmail);
            helper.setSubject("[Kitchen Kakis] You have been added to a household");
            helper.setText(htmlContent, true);

            ClassPathResource logo = new ClassPathResource("logo.png");
            helper.addInline("logo", logo);

            ClassPathResource backgroundImage = new ClassPathResource("formkakis.png");
            helper.addInline("backgroundImage", backgroundImage);

            System.out.println("Email to be sent: " + message);

            // Send email
            emailSender.send(message);
        } catch (MessagingException e) {
            logger.error("Failed to send email", e);
        }
    }

}