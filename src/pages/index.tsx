import React, {useMemo, useRef} from 'react';
import {StyleSheet, useWindowDimensions, SafeAreaView} from 'react-native';
import Message from '../components/Message';
// import ModalConfirm from '../components/ModalConfirm';
import {useDrawProvider} from '../hooks/useDrawProvider';
import {useUxProvider} from '../hooks/useUxProvider';
import ColorPicker from '../components/toolBar/items/ColorPicker';
import DrawPicker from '../components/toolBar/secondsItems/DrawPicker';
// import StickerPicker from './Toolbar/SecondsItems/StickerPicker';
import Toolbar from '../components/toolBar';
import {TOOLBAR_MARGIN} from '../utils/constants';

const createStyle = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      width,
      height,
      backgroundColor: '#fff',
    },
    message: {
      height: (height / 5) * 4,
    },
    tools: {
      position: 'absolute',
      left: TOOLBAR_MARGIN,
      right: TOOLBAR_MARGIN,
      bottom: height * 0.1,
    },
    secondsTools: {
      position: 'absolute',
      left: TOOLBAR_MARGIN,
      right: TOOLBAR_MARGIN,
      bottom: height * 0.1 + 45 + 30,
    },
  });

export default function DrawingScreen() {
  const skiaViewRef = useRef(null);
  const {width, height} = useWindowDimensions();
  const styles = useMemo(() => createStyle(width, height), [width, height]);

  const UxProvider = useUxProvider();
  const DrawProvider = useDrawProvider();

  return (
    <SafeAreaView style={styles.container}>
      <UxProvider>
        <DrawProvider>
          <React.Fragment>
            <Message innerRef={skiaViewRef} style={styles.message} />
            <Toolbar innerRef={skiaViewRef} style={styles.tools} />
            <DrawPicker style={styles.secondsTools} />
            <ColorPicker style={styles.secondsTools} />
            {/* <StickerPicker style={styles.secondsTools} /> */}
            {/* <ModalConfirm /> */}
          </React.Fragment>
        </DrawProvider>
      </UxProvider>
    </SafeAreaView>
  );
}
