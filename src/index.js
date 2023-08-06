import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import { Table, Form, Button, Navbar, Nav } from 'react-bootstrap'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"


const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  </div>
)

const Note = ({ note }) => {

  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = (props) => (
  <div>
    <h2>Notes</h2>
    <Table striped>
      <tbody>
        {props.notes.map(note =>
          <tr key={note.id}>
            <td>
              <Link to={`/notes/${note.id}`}>
                {note.content}
              </Link>
            </td>
            <td>
              {note.user}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)

const Users = () => (
  <div>
    <h2>notes app</h2>
    <ul>
      <li>lucas serrano</li>
      <li>juan caceres</li>
      <li>luis castro</li>
    </ul>
  </div>
)

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('luis')
    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' name='username' />
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' />
          <Button variant='primary' type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'luis castro'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'luis castro'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'lucas serrano'
    }
  ])

  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const match = useMatch('/notes/:id')

  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  const padding = {
    padding: 5
  }

  return (
    <div className='container'>
      <div>
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link href='#' as='span'>
                <Link style={ padding } to='/'>home</Link>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <Link style={ padding } to='/notes'>notes</Link>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <Link style={ padding } to='/users'>users</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>


        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link style={padding} to="/login">login</Link>
        }
      </div>
      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Router><App /></Router>)