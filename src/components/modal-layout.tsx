import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Form } from 'native-base';

export default class ModalLayout extends React.Component<{ content: React.ReactNode, footer: React.ReactNode, height?: number }> {
    render() {
        let height = this.props.height || 300;
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#00000080'
                }}
            >
                <View style={{ width: 300, height: height, backgroundColor: '#fff' }}>
                    <Container style={styles.container}>
                        <Form style={{ flex: 1 }}>
                            <View style={styles.contentContainer}>
                                {this.props.content}
                            </View>
                            <View style={styles.footer}>
                                {this.props.footer}
                            </View>
                        </Form>
                    </Container>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    footer: {
        alignContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
    },
    footerButton: {
        margin: 10,
        flex: 1,
        justifyContent: 'center'
    }
});
