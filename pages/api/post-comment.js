import { hasSanityWriteConfig, writeClient } from "../../sanity"

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return
    }

    if (!hasSanityWriteConfig) {
        return res.status(503).json({ message: 'Sanity is not configured' })
    }

    const { name, message, _id } = req.body

    console.log(name, message, _id)

    try {
        await writeClient.create({
            _type: 'comment',
            post: {
                _type: 'reference',
                _ref: _id
            },
            name,
            message
        })
    } catch(err) {
        return res.status(500).json(err)
    }

    return res.status(200).json({ message: 'Comment Submitted' })
}
