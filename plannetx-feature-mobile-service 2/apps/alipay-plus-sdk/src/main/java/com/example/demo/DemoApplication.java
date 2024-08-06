package com.example.demo;

import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import sdk.code.service.CodeIdentificationService;
import sdk.code.model.result.CodeIdentificationInitResult;
import sdk.code.model.result.CodeIdentificationResult;
import sdk.code.model.request.CodeIdentificationRequest;

@SpringBootApplication
@RestController
@ImportResource("classpath:/META-INF/config/component-server-sdk.xml")
@Import(AcSdkConfig.class)
public class DemoApplication implements CommandLineRunner {
	@Autowired
  public CodeIdentificationService codeIdentificationService;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		CodeIdentificationInitResult codeIdentificationInitResult = codeIdentificationService.init();
		System.out.println(codeIdentificationInitResult);
	}

	@GetMapping("/identify-code/{code}")
	public LinkedHashMap<String, Object> identifyCode(@PathVariable String code) {
		CodeIdentificationRequest request = new CodeIdentificationRequest(code);
		CodeIdentificationResult codeIdentificationResult = codeIdentificationService.identifyCode(request);
		System.out.println(codeIdentificationResult);

		LinkedHashMap<String, Object> response = new LinkedHashMap<>();
		response.put("resultStatus", codeIdentificationResult.getResult().getResultStatus());
		response.put("resultCode", codeIdentificationResult.getResult().getResultCode());
		response.put("isSupported", codeIdentificationResult.isSupported());
		response.put("postCodeMatchActionType", codeIdentificationResult.getPostCodeMatchActionType());
		response.put("codeValue", codeIdentificationResult.getCodeValue());
		response.put("redirectUrl", codeIdentificationResult.getRedirectUrl());
		response.put("userAgent", codeIdentificationResult.getUserAgent());
		response.put("acDecodeConfig", codeIdentificationResult.getAcDecodeConfig());
		return response;
	}
}

// CodeIdentificationResult
//   [
//     isSupported=true,
//     postCodeMatchActionType=DECODE,
//     codeValue=28166604n7IDRTHBUSUCCDCCSB,
//     redirectUrl=<null>,
//     userAgent=<null>,
//     acDecodeConfig=,
//     result=Result[resultCode=SUCCESS,resultStatus=S,resultMessage=Success]
//   ]