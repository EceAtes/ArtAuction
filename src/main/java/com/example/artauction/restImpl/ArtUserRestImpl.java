package com.example.artauction.restImpl;

import com.example.artauction.rest.UserRest;
import com.example.artauction.wrapper.UserWrapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public class ArtUserRestImpl implements UserRest {
    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        return null;
    }

    @Override
    public ResponseEntity<List<UserWrapper>> getAllUser() {
        return null;
    }
}
