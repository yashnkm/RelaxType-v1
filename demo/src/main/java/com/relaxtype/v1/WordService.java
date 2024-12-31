package com.relaxtype.v1;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

@Service
public class WordService {
	
	private List<String> words;
	
	public WordService() throws IOException {
		try {
			ClassPathResource resource = new ClassPathResource("com/relaxtype/words/words.txt");
			
			String content = new String(resource.getInputStream().readAllBytes(),StandardCharsets.UTF_8);
			
			this.words = Arrays.asList(content.split("\\r?\\n"));
			
		}catch(IOException e) {
			System.out.print(e.getMessage()+" Error reading file");
		}
		

		
	}
	
	public List<String> getRandomWords(int count){
		
		if(count>=words.size()) {
			List<String> shuffledWords = new ArrayList<>(words);
			Collections.shuffle(shuffledWords);
			return shuffledWords;
		}
		List<String> copy = new ArrayList<>(words);
		Collections.shuffle(copy);
		return copy.subList(0, count);
	}
} 
