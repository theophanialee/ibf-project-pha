package ibf.project.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ibf.project.backend.models.ChatMessage;

@Controller
public class ChatController {
    @Autowired
    ObjectMapper objectMapper;

    @MessageMapping("/chat")
    @SendTo("/topic/household")
    public ChatMessage sendMessage(String message) throws JsonMappingException, JsonProcessingException {

        ChatMessage chatMessage = objectMapper.readValue(message, ChatMessage.class);
        return chatMessage;
    }
}
