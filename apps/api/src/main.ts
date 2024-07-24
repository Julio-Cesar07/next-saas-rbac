import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './infra/app.module';
import { EnvService } from './infra/env/env.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Saas')
		.setDescription('The saas API description')
		.setVersion('1.0')
		.addTag('Saas')
		.build();
	patchNestjsSwagger();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document, {
		jsonDocumentUrl: 'docs/json',
	});

	const env = app.get(EnvService);

	await app.listen(env.get('PORT'));
}
bootstrap();
