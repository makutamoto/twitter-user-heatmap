export interface UserDataViewProps {
    title: string,
    data: number,
}
export default function(props: UserDataViewProps) {
    return (
        <div className="text-center">
            <h2>{props.title}</h2>
            <h1>{props.data}</h1>
            <h4>tweet{props.data > 1 ? 's' : ''}/day</h4>
        </div>
    );
}
