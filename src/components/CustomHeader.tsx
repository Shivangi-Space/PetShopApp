import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PawPrint } from 'lucide-react-native';
import { Colors } from '../constants/Colors';

interface Props {
    title: string;
}

const CustomHeader = ({ title }: Props) => {
    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.iconCircle}>
                        <PawPrint size={20} color="white" />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.divider} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
    backgroundColor: Colors.card,
  },
  container: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, 
  },
  iconCircle: {
    backgroundColor: Colors.primary, 
    padding: 8,
    borderRadius: 10, 
  },
  title: {
    fontSize: 22,
    fontWeight: '800', 
    color: Colors.text,
    letterSpacing: -0.5, 
  },
  divider: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.border,
  },
})

export default CustomHeader;