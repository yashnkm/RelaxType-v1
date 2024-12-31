package com.relaxtype.v1;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class WordsController {
	
	@Autowired
	private WordService wordService;
	
	
	@GetMapping("/get/words")
	public ResponseEntity<?> getWords(@RequestParam("count") int count){
		
		List<String> result = wordService.getRandomWords(count);
	
		return ResponseEntity.ok(result);
	
	}

}
