import { View } from 'react-native';
import { type ImageSource } from 'expo-image';  // 引入 ImageSource 类型，用于指定图像源
import { Gesture, GestureDetector } from 'react-native-gesture-handler'; // 导入手势处理库
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'; // 引入动画和共享值的工具

// 定义组件的Props类型
type Props = {
    imageSize: number;  // 图像的初始尺寸
    stickerSource: ImageSource;  // 贴纸的图像源
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {

    // 使用共享值管理图像的缩放和位置
    const scaleImage = useSharedValue(imageSize);  // 图像的缩放值，初始为传入的 imageSize
    const translateX = useSharedValue(0);  // 图像的水平偏移量
    const translateY = useSharedValue(0);  // 图像的垂直偏移量

    // 双击手势，用来缩放图像
    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)  // 设置为双击手势
        .onStart(() => {
            // 双击时缩放图像的大小，若已放大则恢复原尺寸
            if (scaleImage.value !== imageSize * 2) {
                scaleImage.value = scaleImage.value * 2;  // 放大
            } else {
                scaleImage.value = Math.round(scaleImage.value / 2);  // 缩小
            }
        });

    // 用动画来控制图像的尺寸变化
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),  // 使用弹簧动画平滑过渡
            height: withSpring(scaleImage.value),
        };
    });

    // 拖拽手势，用来改变图像的位置
    const drag = Gesture.Pan().onChange(event => {
        // 每次拖动时更新图像的水平和垂直位置
        translateX.value += event.changeX;
        translateY.value += event.changeY;
    });

    // 用动画控制图像的移动
    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,  // 动态更新水平偏移量
                },
                {
                    translateY: translateY.value,  // 动态更新垂直偏移量
                },
            ],
        };
    });

    return (
        // 包裹着拖拽和双击手势的容器
        <GestureDetector gesture={drag}>
            <Animated.View style={[containerStyle, { top: -350 }]}>  {/* 设置位置并调整容器的顶部偏移量 */}
                {/* 双击手势嵌套在图像上 */}
                <GestureDetector gesture={doubleTap}>
                    {/* 显示贴纸图像，并根据缩放值调整尺寸 */}
                    <Animated.Image
                        source={stickerSource}  // 设置图像源
                        resizeMode="contain"  // 保持图像的比例
                        style={[imageStyle, { width: imageSize, height: imageSize }]}  // 动态样式，初始大小是传入的 imageSize
                    />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}
