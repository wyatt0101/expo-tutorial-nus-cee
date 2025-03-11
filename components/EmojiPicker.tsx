import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// 定义 Props 类型
type Props = PropsWithChildren<{
    isVisible: boolean; // 控制 Modal 是否可见
    onClose: () => void; // 关闭 Modal 的回调函数
}>;

// EmojiPicker 组件：选择表情贴纸的弹出框
export default function EmojiPicker({ isVisible, children, onClose }: Props) {
    return (
        // Modal 组件：弹出框
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            {/* 弹出框内容区域 */}
            <View style={styles.modalContent}>
                
                {/* 顶部标题栏 */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Choose a sticker</Text>
                    {/* 关闭按钮，点击后执行 onClose 方法 */}
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>

                {/* 显示子组件（可以传入表情选择器等内容） */}
                {children}
            </View>
        </Modal>
    );
}

// 样式表
const styles = StyleSheet.create({
    modalContent: {
        height: '25%', // 高度占屏幕 25%
        width: '100%', // 宽度占满屏幕
        backgroundColor: '#25292e', // 深色背景
        borderTopRightRadius: 18, // 右上角圆角
        borderTopLeftRadius: 18, // 左上角圆角
        position: 'absolute', // 绝对定位
        bottom: 0, // 贴在屏幕底部
    },
    titleContainer: {
        height: '16%', // 标题栏高度
        backgroundColor: '#464C55', // 标题背景色
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20, // 左右内边距
        flexDirection: 'row', // 水平方向布局
        alignItems: 'center', // 垂直居中
        justifyContent: 'space-between', // 左右对齐（标题在左，按钮在右）
    },
    title: {
        color: '#fff', // 白色文字
        fontSize: 16, // 文字大小
    },
});
