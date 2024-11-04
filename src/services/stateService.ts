import axios from "axios"

const fetchState = async () => {
    try {
        const result = await axios.get("http://localhost:3000/state/get")
        return result.data
    } catch (error) {
        console.error(error)
    }
}

const setState = async (newState: any) => {
    try {
        const result = await axios.post("http://localhost:3000/state/set", newState)
        return result.data
    } catch (error) {
        console.error(error)
    }
}

export default { fetchState, setState }
