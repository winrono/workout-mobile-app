import React from 'react';
import { Text, ScrollView } from 'react-native';
import { SuperSet } from '../models/super-set';
import { ListItem, Body } from 'native-base';

export function SupersetView(props: SupersetViewProps) {
    return (<ListItem icon>
        <Body>
            <ScrollView>
                {props.superset.sets.map((simpleSet) => (
                    <Text>
                        {'\u2022'} {simpleSet.name} {simpleSet.repetitionsCount} reps with {simpleSet.weight} kg
                    </Text>
                ))}
            </ScrollView>
        </Body>
    </ListItem>)
}

interface SupersetViewProps {
    superset: SuperSet
}