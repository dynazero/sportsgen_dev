import { useEffect, useState } from 'react'
import io from 'socket.io-client'

let socket;

const Home = () => {
  const [input, setInput] = useState('')
  const [role, setRole] = useState('admin')
  const [tournamentId, setTournamentId] = useState('01')

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch('/api/socketRoom')
      socket = io()

      socket.on('connect', () => {
        console.log('connected')
        // Join a room upon connection.
        socket.emit('join', { tournamentId, role }); // or role: "guest"
      });

      socket.on('score-update', msg => {
        setInput(msg)
      });
    }

    socketInitializer();
  }, [tournamentId, role])

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setInput(value);

    if (role === 'admin') {
      socket.emit('score-update', value);
    }
  }

  return (
    <div>
      {role === 'admin' ? (
        <>
          <label>
            Update Score: 
            <input
              value={input}
              onChange={onChangeHandler}
            />
          </label>
          <button onClick={() => socket.emit('score-update', input)}>Post Score</button>
        </>
      ) : (
        <div>
          Current Score: {input}
        </div>
      )}

      {/* For demonstration purposes only: Toggle Role */}
      <button onClick={() => setRole(role === 'admin' ? 'guest' : 'admin')}>
        Toggle Role (Current: {role})
      </button>
    </div>
  );
}

export default Home;