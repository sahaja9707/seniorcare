#include<stdio.h>

int main()
{
    int l_pnt, x, y, r;
    int count=1;
    
    printf("Enter the radius: ")
    scanf("%d", &r);
    
    while (1<=x<=r-1)
    {
    if (x*x + y*y == r*r)
    {
        count+=4;    
    }
    }
    printf("Total lattice points: ");
    printf("%d", count);
}