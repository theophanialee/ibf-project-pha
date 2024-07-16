package ibf.project.backend.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import ibf.project.backend.models.ChatMessage;

@Controller
public class ChatController {

    @MessageMapping("/chat")
    @SendTo("/topic/household")
    public ChatMessage sendMessage(ChatMessage message) {

        System.out.println("Received message: " + message.getMessage());
        return message;
    }
}
