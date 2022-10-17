/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {ImageFormat, SkiaView} from '@shopify/react-native-skia';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
// import Share from 'react-native-share';
import DrawTool from './items/DrawTool';
import ColorsTool from './items/ColorsTool';
import SelectionTool from './items/SelectionTool';
import DeleteTool from './items/DeleteTool';
// import SendTool from './items/SendTool';
import {TOOLBAR_HEIGHT} from '../../utils/constants';
import {useUxContext} from '../../hooks/useUxContext';
import {useDrawContext} from '../../hooks/useDrawContext';
// import StickersTool from './items/StickersTool';

type ToolbarProps = {
  _innerRef: React.RefObject<SkiaView>;
  style: ViewStyle;
};

export default function Toolbar({_innerRef, style}: ToolbarProps) {
  const uxContext = useUxContext();
  const drawContext = useDrawContext();
  const [activeTool, setActiveTool] = useState(uxContext.state.menu);
  const [color, setColor] = useState(drawContext.state.color);
  const [backgroundColor, setBackgroundColor] = useState(
    drawContext.state.backgroundColor,
  );
  const [size, setSize] = useState(drawContext.state.size);
  const [haveElements, setHaveElements] = useState(
    drawContext.state.elements.length > 0,
  );

  useEffect(() => {
    const unsubscribeUx = uxContext.addListener(state => {
      setActiveTool(state.menu);
    });
    const unsubscribeDraw = drawContext.addListener(state => {
      setColor(state.color);
      setBackgroundColor(state.backgroundColor);
      setHaveElements(state.elements.length > 0);
      setSize(state.size);
    });
    return () => {
      unsubscribeDraw();
      unsubscribeUx();
    };
  }, [drawContext, uxContext]);

  const handleDrawingToolPressed = useCallback(() => {
    uxContext.commands.toggleMenu('drawing');
  }, [uxContext.commands]);

  //   const handleStickersPressed = useCallback(() => {
  //     uxContext.commands.toggleMenu('chooseSticker');
  //   }, [uxContext.commands]);

  const handleDelete = useCallback(() => {
    if (drawContext.state.selectedElements.length === 0) {
      uxContext.commands.toggleModal(true);
    } else {
      drawContext.commands.deleteSelectedElements();
    }
  }, [drawContext.commands, uxContext.commands]);

  const handleColorPressed = useCallback(() => {
    uxContext.commands.toggleMenu('colors');
  }, [uxContext.commands]);

  const handleSelectionPressed = useCallback(() => {
    uxContext.commands.toggleMenu('selection');
  }, [uxContext.commands]);

  //   const share = async () => {
  //     await drawContext.commands.cleanUseless();
  //     const image = innerRef.current?.makeImageSnapshot();
  //     if (image) {
  //       const data = image.encodeToBase64(ImageFormat.JPEG, 100);
  //       const url = `data:image/png;base64,${data}`;
  //       const shareOptions = {
  //         title: 'Sharing image from awesome drawing app',
  //         message: 'My drawing',
  //         url,
  //         failOnCancel: false,
  //       };
  //       await Share.open(shareOptions);
  //     }
  //   };

  return (
    <View style={[style, styles.container]}>
      <DrawTool
        selected={activeTool === 'drawing'}
        onPress={handleDrawingToolPressed}
        styles={toolsStyles}
      />
      {/* <StickersTool
        selected={activeTool === 'chooseSticker'}
        onPress={handleStickersPressed}
        styles={toolsStyles}
      /> */}
      {/* <SelectionTool
        selected={activeTool === 'selection'}
        onPress={handleSelectionPressed}
        styles={toolsStyles}
      /> */}
      <DeleteTool
        disabled={!haveElements}
        onPress={handleDelete}
        styles={toolsStyles}
      />
      <ColorsTool
        backgroundColor={backgroundColor}
        color={color}
        size={size}
        onPress={handleColorPressed}
        styles={toolsStyles}
      />
      {/* <SendTool styles={toolsStyles} onPress={share} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 5},
    elevation: 4,
  },
});

const toolsStyles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: TOOLBAR_HEIGHT - 5,
    height: TOOLBAR_HEIGHT - 5,
  },
  selected: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
  },
  disabled: {
    opacity: 0.4,
  },
});
