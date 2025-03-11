import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button,  Keyboard, TouchableWithoutFeedback  } from 'react-native';

export default function AboutScreen() {
  const [inputText, setInputText] = useState(''); // 存储输入框中的文本
  const [result, setResult] = useState(''); // 存储API返回的结果
  const [loading, setLoading] = useState(false); // 控制加载状态

  const [image, setImage] = useState(null); // 存储用户选择的图片
  const [resultImage, setResultImage] = useState(null); // 存储API返回的目标检测图片

  // // 模拟API请求
  // const handleFetchData = async () => {
  //   setLoading(true); // 设置加载状态为true，表示正在等待API响应

  //   try {
  //     // 尝试解析输入的文本为JSON格式
  //     const inputJson = JSON.parse(inputText);

  //     // 向后端服务器发送POST请求，请求推荐数据
  //     const response = await fetch('http://172.20.10.4:5000/recommend', {
  //       method: 'POST', // 设置请求方法为POST
  //       headers: {
  //         'Content-Type': 'application/json', // 设置请求头，指定请求体内容类型为JSON
  //       },
  //       body: JSON.stringify(inputJson), // 将解析后的JSON对象作为请求体发送给服务器
  //     });

  //     if (response.ok) { // 如果响应状态码是200系列（成功）
  //       const data = await response.json(); // 解析返回的JSON数据

  //       // 假设返回的JSON数据包含'recommendations'字段
  //       setResult(JSON.stringify(data, null, 2)); // 将返回的JSON格式化并显示（格式化为易于阅读的格式）
  //     } 
      
  //     else {
  //       setResult('Error: Unable to fetch data'); // 如果响应失败，显示错误消息
  //     }
  //   } catch (error) {
  //     console.error(error); // 在控制台打印错误信息
  //     setResult('Error: Invalid JSON or Something went wrong'); // 捕获异常并显示错误提示
  //   } finally {
  //     setLoading(false); // 无论请求是否成功，最终都设置加载状态为false，表示加载完成
  //   }
  // };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.text}>About screen</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter JSON formatted text"
          placeholderTextColor="#ccc"
          value={inputText}
          onChangeText={setInputText}
          multiline
          returnKeyType="done" // 让键盘上的回车键变成“完成”
        />

        {/* <Button title="Get Recommendations" onPress={handleFetchData} /> */}

        {loading ? <Text style={styles.text}>Loading...</Text> : <Text style={styles.result}>{result}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 100,
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  result: {
    color: '#fff',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 8,
    width: '100%',
    textAlign: 'left',
  },
});
