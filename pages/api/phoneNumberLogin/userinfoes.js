export default async function handler(req, res) {
    const { ID } = req.body;        
    if (!global.usersPhoneNumber || global.usersPhoneNumber.length === 0) {
        console.log("global.usersPhoneNumber is not loaded yet");
        return res.status(500).json({ message: 'Data not available' });
    }
    const findOutPhoneNumebr =await global.usersPhoneNumber.find(item => item.id === ID);
    if (findOutPhoneNumebr) {
        return res.status(200).json({ usersPhoneNumber : findOutPhoneNumebr.number, timer: 2000 });
    } else {
        return res.status(404).json({ message: 'Phone number not found' });
    }
}

 