import openai from "openai";
import express from "express";

const router = express.Router();

router.get("/chat", async (req, res) => {
  // 设置您的OpenAI API密钥
  const apiKey = "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";

  // 创建OpenAI实例
  const openaiInstance = new openai.OpenAIApi(apiKey);
  // console.log(openaiInstance)
  // 定义生成文本的请求
  const completionParams = {
    prompt: "Once upon an AI",
    max_tokens: 5,
    temperature: 1.0,
    echo: true,
  };

  let result = await openaiInstance.createCompletion(completionParams);
  // 使用OpenAI API进行文本生成请求
  console.log(result);
  res.send({ text: result, status: "0" });
});

export default router;
