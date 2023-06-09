import { Text, StyleSheet, View, ActivityIndicator, FlatList } from 'react-native'
import React, { Component } from 'react'
import Umesh from './assets/components';
//import Inside from './assets/inside';
import { Searchbar } from 'react-native-paper';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      polls: [],
      isLoading: true,
      searchText:'',
    };
  }

async getPolls() {
  try {
    const response = await fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0');
    const json = await response.json();
    this.setState({polls: json.hits});
  } catch (error) {
    console.warn(error);
  } finally {
    this.setState({isLoading: false});
    
  }
}

componentDidMount() {
  this.getPolls();
  console.warn('api called')
}
    
  
  // componentDidMount() {
  //   this.timer = setInterval(()=> this.getItems(), 1000);
  // }
  
  // componentWillUnmount() {
  //   this.timer = null; // here...
  // }
  
  render() {
    const {polls, isLoading} = this.state;

    return (
      <View style={{flex: 1, padding: 24}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (<>
          <Text style={styles.headstyle}><center>BREAKING NEWS!!!</center></Text>
          <Searchbar
      placeholder="Search"
      onChangeText={this.onChangeSearch}
      value={this.state.searchText}
    />
          <FlatList style={styles.listStyle}
            data={polls}
            keyExtractor={({created_at_i}) => created_at_i}
           
            renderItem={({item}) => (
              <Text style={styles.textStyle}>
                {item.title}, {item.author},<a href={item.url}> Details </a><Umesh textdata="pollcheck"/>
              </Text>
            )}
            
          />
          </>
        )}
      </View>
    );
  }
  onChangeSearch = (query)=>{
    this.setState({
       searchText : query
    })

    this.setState({
       polls : this.state.polls.filter(poll => {
           if (this.state.searchText === "") {
             return poll;
           } else if (poll.title.toLowerCase().includes(this.state.searchText.toLowerCase()) || poll.author.toLowerCase().includes(this.state.searchText.toLowerCase())) {
             return poll;
           }
         })
    })
 }
}


const styles = StyleSheet.create({
  textStyle: {
    
    borderTopRightRadius: 30,
    borderBottomLeftRadius:30,
    backgroundColor:'yellow',
    margin:20,
    fontSize:25,
  },
  headstyle: {
    borderRadius:40,
    textShadowColor:'white',
    backgroundColor:'blue',
    margin:20,
    fontSize:30,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  listStyle: {
    textAlign:'center',
    margin:20,
  }
});
