package com.faculty.catalog.services;

import com.faculty.catalog.models.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Creăm un utilizator static pentru autentificare (poți extinde acest serviciu pentru a obține utilizatori din baza de date)
        if ("admin".equals(username)) {
            return new User("admin", "{noop}admin"); // {noop} înseamnă că parola nu este criptată
        }
        throw new UsernameNotFoundException("User not found");
    }
}
