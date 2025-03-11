import { StyleSheet } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

// 定义组件的 Props（参数类型）
type Props = {
    imgSource: ImageSource; // 默认图片（例如占位图）
    selectedImage?: string; // 用户选择的图片（可选）
};

// ImageViewer 组件用于显示图片，支持默认图片和用户选择的图片
export default function ImageViewer({ imgSource, selectedImage }: Props) {
    
    // 判断是否有用户选择的图片
    // 如果有，则使用用户选择的图片（selectedImage），否则使用默认图片（imgSource）
    const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

    // 返回一个图片组件，显示相应的图片
    return <Image source={imageSource} style={styles.image} />;
}

// 样式表
const styles = StyleSheet.create({
    image: {
        width: 330,        // 图片宽度
        height: 450,       // 图片高度
        borderRadius: 18,  // 圆角处理，使图片边缘更柔和
    },
});
