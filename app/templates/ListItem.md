```
<ul>
    {friends.map(({ id, name, image }) => (
        <>
        <li key={id}>
            <div className="flex flex-row my-2 ml-2 justify-between">
            <div className="flex flex-row">
                <div className="btn btn-circle bg-base-200">
                <Image
                    src={image}
                    alt={name}
                    height={44}
                    width={44}
                    className="rounded-full h-12 w-12"
                />
                </div>
                <h2 className="text-2xl my-auto ml-4">{name}</h2>
            </div>
            <Link href={`/friends/${id}`} className="btn btn-circle mr-4">
                <ChevronRightIcon className="h-8 w-8" />
            </Link>
            </div>
        </li>
        <div className="divider"></div>
        </>
    ))}
</ul>
```
