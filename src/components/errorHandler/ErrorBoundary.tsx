import React, { Component, ErrorInfo, ReactNode } from "react";

import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import styles from './errorHandlerStyle'
import RNRestart from 'react-native-restart';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <View style={styles.errorPageContainer}>
                    <View style={styles.errorTextContainer}>
                        <Text style={styles.errorText}>
                            Something went wrong
                        </Text>
                        <View>
                            <TouchableOpacity onPress={() => RNRestart.Restart()}>
                                <Text style={styles.resetButton}>Restart</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;