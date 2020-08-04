import React, { Component } from 'react';
import DropdownMenu from 'react-native-dropdown-menu';
import { View, Text } from "react-native";
export default class dropdown extends Component {
constructor(props) {
super(props);
this.state = {
text: ''
};
}
render() {
var data = [["Historical", "Commedy", "Ethical", "Horrer"]];
return (
<View>
<DropdownMenu
bgColor={'blue'}
tintColor={'black'}
activityTintColor={'red'}
handler={(selection, row) => this.setState({text: data[selection][row]})}
data={data}
>
</DropdownMenu>
</View>
);
}
}
