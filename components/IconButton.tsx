import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// 定义 Props（组件参数类型）
type Props = {
    icon: keyof typeof MaterialIcons.glyphMap; // 传入的图标名称，必须是 MaterialIcons 提供的图标
    label: string; // 按钮下方的文本标签
    onPress: () => void; // 按钮点击时触发的回调函数
};

// IconButton 组件：带图标的按钮
export default function IconButton({ icon, label, onPress }: Props) {
    return (
        // Pressable 组件：实现点击效果
        <Pressable style={styles.iconButton} onPress={onPress}>
            {/* MaterialIcons 图标，大小为 24，颜色为白色 */}
            <MaterialIcons name={icon} size={24} color="#fff" />
            {/* 按钮的文本标签 */}
            <Text style={styles.iconButtonLabel}>{label}</Text>
        </Pressable>
    );
}

// 样式表
const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center', // 垂直居中
        alignItems: 'center', // 水平居中
    },
    iconButtonLabel: {
        color: '#fff', // 文字颜色：白色
        marginTop: 12, // 文字与图标的间距
    },
});
