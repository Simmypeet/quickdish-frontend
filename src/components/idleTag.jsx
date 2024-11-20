const IdleTag = ({ name }) => {
    return (
        <div
            className="
                mr-2 line-clamp-1 flex whitespace-nowrap 
                rounded-lg bg-gradient-to-bl from-pink-500 to-orange-400 
                px-2 py-0.5 text-center text-sm font-light text-white
        "
        >
            {name}
        </div>
    );
};

export default IdleTag;
