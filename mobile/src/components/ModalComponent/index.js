import React from 'react';
import { View } from 'react-native';
import { useModal } from '../../contexts/modal';
import Modal from 'react-native-modal';

export const ModalComponent = () => {
    const {content, isVisible, setIsVisible, setContent} = useModal();
    
    return (
        <View style={{flex: 1}}>
            <Modal 
                isVisible={isVisible}
                swipeDirection="up"
                swipeThreshold={1}
                onSwipeComplete={() => {
                    setIsVisible(false);
                    setContent(null);
                }}
                onSwipeCancel={() => setIsVisible(true)}
                onBackdropPress={() => {
                    setIsVisible(false);
                    setContent(null);
                }}
            >
                {content}
            </Modal>
        </View>
    )
}