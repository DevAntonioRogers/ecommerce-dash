import { User } from "@prisma/client";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import {
  approveTeamMember,
  declineTeamMember,
  deleteTeamMember,
  updateTeamMember,
} from "@/server/actions/team-actions";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

interface TeamMemberCardProps {
  member: User;
  isPending: boolean;
  role: boolean;
}

export default function TeamCard({
  member,
  isPending,
  role,
}: TeamMemberCardProps) {
  const [isAdmin, setIsAdmin] = useState(member.isAdmin);
  const imageUrl =
    member.image && member.image !== "no-image"
      ? member.image
      : "/fallbackimage.png";

  //APPROVE TEAM MEMBER FUNCTION
  const handleApproveTeamMember = () => {
    if (!role) {
      toast.error(
        "You must be an admin to approve a team member"
      );
      return;
    }

    approveTeamMember({
      email: member.email,
      name: member.name,
    });
    toast.success(`${member.name} has been approved`);
  };

  //DECLINE TEAM MEMBER FUNCTION
  const handleDeclineTeamMember = () => {
    if (!role) {
      toast.error(
        "You must be an admin to decline a team member"
      );
      return;
    }

    declineTeamMember({
      email: member.email,
      name: member.name,
    });
    toast.success(`${member.name} has been declined`);
  };

  const handleUpdateRole = () => {
    updateTeamMember({ email: member.email, isAdmin });
    toast.success(
      `Role for ${member.name} has been updated`
    );
  };

  const handleEditDeleteModal = (e: React.MouseEvent) => {
    if (!role) {
      e.preventDefault();
      toast.error(
        "You must be an admin to edit a team member."
      );
    }
  };

  //DELETE TEAM MEMBER
  const handleDeleteTeamMember = () => {
    if (!role) {
      toast.error(
        "You must be an admin to delete a team member."
      );
      return;
    }
    deleteTeamMember({ email: member.email });
    toast.success(`${member.name} has been deleted`);
  };

  return (
    <Card className="dark:bg-tertiary bg-slate-100 flex flex-col justify-between items-center overflow-hidden shadow-lg rounded-lg p-4 gap-4 relative">
      <Image
        className="rounded-full"
        src={imageUrl}
        width={100}
        height={100}
        alt={`image of ${member.name}`}
      />
      <h1 className="text-center">{member.name}</h1>
      <span>{member.location}</span>
      <div className="absolute right-3 bg-primary px-1 rounded-md text-white">
        {member.isAdmin ? "Admin" : ""}
      </div>
      <div className="flex items-center gap-2">
        {isPending ? (
          <>
            <Button onClick={handleApproveTeamMember}>
              Approve
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeclineTeamMember}
            >
              Decline
            </Button>
          </>
        ) : (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={handleEditDeleteModal}>
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    Edit Team Member
                  </DialogTitle>
                  <DialogDescription>
                    Update the role of {member.name}
                  </DialogDescription>
                </DialogHeader>
                <Image
                  src={imageUrl}
                  width={50}
                  height={50}
                  alt={`Image of ${member.name}`}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="admin"
                    checked={isAdmin}
                    onCheckedChange={(checked) =>
                      setIsAdmin(!!checked)
                    }
                  />
                  <label htmlFor="admin">Admin</label>
                </div>
                <DialogClose>
                  <Button onClick={handleUpdateRole}>
                    Save Changes
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  onClick={handleEditDeleteModal}
                >
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    Delete Team Member
                  </DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete{" "}
                    {member.name}? This action cannot be
                    undone.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteTeamMember}
                    >
                      Yes, Delete
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </Card>
  );
}
