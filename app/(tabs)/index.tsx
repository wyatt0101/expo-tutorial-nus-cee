import { Text, View, StyleSheet } from 'react-native';
import { useState, useRef } from 'react';
import { captureRef } from 'react-native-view-shot';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import * as ImagePicker from 'expo-image-picker';
import { type ImageSource } from 'expo-image';
import * as MediaLibrary from 'expo-media-library';

// 引入自定义组件
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';

// 设置默认背景图片
const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  // 选中的图片（用户选择的图片）
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  // 是否显示图片编辑选项（如添加贴纸、保存等）
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  // 贴纸选择弹窗是否可见
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // 用户选中的贴纸
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);

  // 授权状态
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const imageRef = useRef<View>(null);

  if (status === null) {
    requestPermission();
  }

  // 选择图库图片的函数
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // 仅允许选择图片
      allowsEditing: true, // 允许用户裁剪图片
      quality: 1, // 图片质量，1为最高
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // 设置用户选中的图片
      setShowAppOptions(true); // 显示编辑选项
    } else {
      alert('You did not select any image.'); // 用户未选择图片时弹出提示
    }
  };

  // 重置功能，恢复默认背景图片
  const onReset = () => {
    setShowAppOptions(false);
  };

  // 添加贴纸按钮点击事件，打开贴纸选择弹窗
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  // 关闭贴纸选择弹窗
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  // 保存图片功能
  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert('Saved!');
      }
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <GestureHandlerRootView style={styles.container}>
      {/* 标题 */}
      <Text style={styles.text}>Edit Your Picture</Text>

      {/* 图片展示区域 */}
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {/* 如果用户选择了贴纸，则显示 */}
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>

      {/* 根据 showAppOptions 显示不同的 UI */}
      {/*true为编辑照片，false为选择照片*/}
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          {/* 选项按钮（重置、添加贴纸、保存图片） */}
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          {/* 用户可以选择新照片或直接使用默认照片 */}
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}

      {/* 贴纸选择弹窗 */}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

// 样式定义
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },

  text: {
    color: '#fff',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },

  imageContainer: {
    flex: 1,
  },

  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },

  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },

  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

