import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// 定义组件的 props 类型
type Props = {
    label: string; // 按钮文本
    theme?: 'primary'; // 可选的主题类型（目前只有 'primary'）
    onPress?: () => void; // 按钮点击事件的回调函数
};

// 定义 Button 组件
export default function Button({ label, theme, onPress }: Props) {
    // 如果 theme 是 'primary'，则渲染带边框和图标的按钮
    if (theme == 'primary') {
        return (
            <View
                style={[
                    styles.buttonContainer,
                    { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 }, // 设定边框样式
                ]}>
                <Pressable
                    style={[styles.button, { backgroundColor: '#fff' }]} // 按钮背景为白色
                    onPress={onPress}>
                    
                    {/* 添加一个 FontAwesome 图标 */}
                    <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />

                    {/* 按钮文本 */}
                    <Text style={[styles.buttonLabel, { color: '#25292e' }]}>
                        {label}
                    </Text>
                </Pressable>
            </View>
        );
    }

    // 默认样式的按钮
    return (
        <View style={styles.buttonContainer}>
            <Pressable
                style={styles.button}
                onPress={onPress}>

                <Text style={[styles.buttonLabel]}>
                    {label}
                </Text>

            </Pressable>
        </View>
    );
}

// 定义样式
const styles = StyleSheet.create({
    // 按钮外层容器样式
    buttonContainer: {
        width: 320, // 按钮宽度
        height: 68, // 按钮高度
        marginHorizontal: 20, // 水平方向上的外边距
        alignItems: 'center', // 子元素水平居中
        justifyContent: 'center', // 子元素垂直居中
        padding: 3, // 内边距
    },
    // 按钮样式
    button: {
        borderRadius: 10, // 圆角
        width: '100%', // 宽度占满容器
        height: '100%', // 高度占满容器
        alignItems: 'center', // 水平居中
        justifyContent: 'center', // 垂直居中
        flexDirection: 'row', // 让图标和文本横向排列
    },
    // 按钮文本样式
    buttonLabel: {
        color: '#fff', // 文字颜色（默认白色）
        fontSize: 16, // 字体大小
    },
    // 图标样式
    buttonIcon: {
        paddingRight: 8, // 右侧间距
    },
});
