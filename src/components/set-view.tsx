// import React from 'react';
// import { ListItem, Body, Right } from 'native-base';
// import { Text } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { AntDesign } from '@expo/vector-icons';
// import { Set } from '../models/set';

// export function SetView(props: SetViewProps) {
//     return (<ListItem icon>
//         <Body>
//             <Text>
//                 {props.set.repsCount} reps with {props.set.weight} kg
//             </Text>
//         </Body>
//         <Right>
//             <TouchableOpacity>
//                 <AntDesign onPress={() => {
//                     props.onEdit();
//                 }} style={{ marginRight: 10 }} size={30} active name='edit' />
//             </TouchableOpacity>
//             <TouchableOpacity>
//                 <AntDesign
//                     onPress={() => {
//                         props.onDelete();
//                     }}
//                     size={30}
//                     active
//                     name='delete'
//                 />
//             </TouchableOpacity>
//         </Right>
//     </ListItem>);
// }

import React from 'react';
import { ListItem, Body, Right, View, CardItem } from 'native-base';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Set } from '../models/set';

export function SetView(props: SetViewProps) {
    return (
        <CardItem cardBody={true} style={{ flexBasis: '20%' }}>
            <Body style={{ padding: 5 }}>
                <TouchableOpacity onPress={() => props.onEdit()}>
                    <Text>
                        {props.set.weight} kg
            </Text>
                    <Text>
                        {props.set.repsCount} reps
            </Text>
                </TouchableOpacity>
            </Body>
        </CardItem>
    );
}

interface SetViewProps {
    set: Set,
    onDelete: () => void;
    onEdit: () => void;
}