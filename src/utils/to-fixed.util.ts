const toFixedUtil = (x: number): string | number =>
{
    let e: number;

    if (Math.abs(x) < 1.0)
    {
        e = parseInt(x.toString().split('e-')[1]);

        if (e)
        {
            x *= Math.pow(10, e - 1);
            x = 0;
        }
    }
    else
    {
        e = parseInt(x.toString().split('+')[1]);

        if (e > 20)
        {
            e -= 20;
            x /= Math.pow(10, e);
            x += 0;
        }
    }
    return x;
};

export default toFixedUtil;
