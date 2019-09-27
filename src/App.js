import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import { directive } from '@babel/types';
import Amplify from 'aws-amplify';
import { createNote } from './graphql/mutations';

class App extends Component {
   state = {
      note: '',
      notes: []
   };

   handleChangeNote = event => {
      this.setState({ note: event.target.value });
   };
   handleAddNote = event => {
      const { note } = this.state;
      event.preventDefault();
      const input = { note };
      API.graphql(graphqlOperation(createNote, { input }));
   };

   render() {
      const { notes } = this.state;
      return (
         <div className="flex flex-column items-center justify-center pa3 bg-washed-red">
            <h1 className="code f2-l">PurpleBox Note</h1>
            <form className="mb3" onSubmit={this.handleAddNote}>
               <input type="text" className="pa2 f4" placeholder="Write Your Note" onChange={this.handleChangeNote} />
               <button className="pa2 f4" type="submit">
                  Add Note
               </button>
            </form>
            {/*  Notes List */}
            <div>
               {notes.map(item => (
                  <div key={item.id} className="flex items-center">
                     <li className="list pa1 f3">{item.note}</li>
                     <button className="bg-transparent bn f4">
                        <span>&times;</span>
                     </button>
                  </div>
               ))}
            </div>
         </div>
      );
   }
}

export default withAuthenticator(App, { includeGreetings: true });
