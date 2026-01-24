import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { sampleAction } from 'src/features/sample/sampleReducer.ts'
import { useAppDispatch } from 'src/global/store/redux/reduxHooks.tsx'
import { Button } from 'src/shared/lib/shadcn/components/ui/button.tsx'
import { Card } from 'src/shared/lib/shadcn/components/ui/card.tsx'

const Sample = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const [cccc, setCccc] = useState(0)

    // ------------------------ 카운터 ------------------------

    // 카운터 값
    const [count, setCount] = useState(0)


    // ------------------------ 다른 기능 ------------------------

    useEffect(() => {
        dispatch(sampleAction.initialize('value'))

        return () => {
            dispatch(sampleAction.initialize('value'))
        }
    }, [dispatch])
    const notify = () => toast('Wow so easy !')

    return (
        <div>
            <Card className="flex flex-col items-center bg-gray-100">
                <h1 className="mb-6 text-4xl font-bold">Counter</h1>
                <p className="mb-6 font-mono text-6xl">{count}</p>
                <div className="flex space-x-4">
                    <button
                        onClick={() => setCount(count + 1)}
                        className="rounded-lg bg-green-500 px-6 py-3 text-white shadow transition hover:bg-green-600"
                    >
                        +1
                    </button>
                    <button
                        onClick={() => setCount(count - 1)}
                        className="rounded-lg bg-red-500 px-6 py-3 text-white shadow transition hover:bg-red-600"
                    >
                        -1
                    </button>
                    <button
                        onClick={() => setCount(0)}
                        className="rounded-lg bg-gray-500 px-6 py-3 text-white shadow transition hover:bg-gray-600"
                    >
                        Reset
                    </button>
                </div>
            </Card>
            <Button
                title={'페이지 이동'}
                onClick={() => {
                    navigate(`/sample/${count}`)
                }}
            >
                페이지 이동
            </Button>
            <div className={'bg-accent h-50 w-50'}></div>
            <button onClick={notify}>Notify !</button>
            <button
                onClick={() => {
                    navigate('/')
                }}
            >
                상세 페이지로
            </button>
            <div>
                <button
                    onClick={() => {
                        navigate('/sample/sample')
                    }}
                >
                    sssssssssssss
                </button>
            </div>
            {cccc}
            <button
                onClick={() => {
                    setCccc((state) => state + 1)
                }}
            >
                bbbbbbbbbbbbbbbbbbbbbbb
            </button>
            sdfsdfd sdfsdfd
        </div>
    )
}

export default Sample
